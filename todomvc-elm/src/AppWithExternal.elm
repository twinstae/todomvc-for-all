port module AppWithExternal exposing (main)

import Browser
import Html exposing (Attribute, Html, article, button, form, input, label, span, text, ul)
import Html.Attributes exposing (attribute, checked, class, for, id, placeholder, type_, value)
import Html.Events exposing (on, onClick, onInput, onSubmit)
import Json.Decode as D
import Json.Encode as E
import Browser.Dom
import Task

type alias BaseTodo = { content : String, id : Int, isCompleted : Bool }

main : Program (List BaseTodo) Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

-- Model

type alias Todo =
    { content : String, id : Int, isCompleted : Bool, isEditing : Bool, editInput : String }


type alias Model =
    { input : String, todoList : List Todo }


init : List BaseTodo -> ( Model, Cmd Msg )
init initTodoList =
    ( Model "" (List.map withIsEditing initTodoList), Cmd.none )


withIsEditing : BaseTodo -> Todo
withIsEditing todo =
    { id = todo.id, content = todo.content, isCompleted = todo.isCompleted, isEditing = False, editInput = todo.content }

port focus : E.Value -> Cmd msg

-- UPDATE

port action : E.Value -> Cmd msg

subscriptions : Model -> Sub Msg
subscriptions _ =
    subscribeStore StateFromStore

port subscribeStore : (List BaseTodo -> msg) -> Sub msg

type Msg
    = Input String
    | AddTodo
    | Delete Int
    | StartEdit Int
    | EditTodo Int String
    | EndEdit Int String
    | Check Int Bool
    | Same
    | StateFromStore (List BaseTodo)
    | FocusResult (Result Browser.Dom.Error ())

actionE: String -> List (String, E.Value) -> Cmd msg
actionE t payloadFieldsE= action (E.object [ ("type", E.string ("todoList/" ++ t)), ("payload", E.object payloadFieldsE) ]) 

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input input ->
            ( { model | input = input }, Cmd.none )

        AddTodo ->
            if String.isEmpty model.input then
                ( model, Cmd.none )
            else
                ( {model | input = ""}, actionE "addTodo" [("content", E.string model.input)] )

        Delete id ->
            ( model, actionE "deleteTodo" [("id", E.int id)] )

        Check id isCompleted ->
            ( model, actionE "completeTodo"[("id", E.int id), ("isCompleted", E.bool isCompleted)] )

        StartEdit id ->
            ( { model
                | todoList = List.map (startEdit id) model.todoList
              }
            , Browser.Dom.focus ("todo-edit-input-"++String.fromInt(id)) |> Task.attempt FocusResult
            )
        FocusResult result ->
            -- handle success or failure here
            case result of
                Err (Browser.Dom.NotFound _) -> ( model, Cmd.none )
                    -- unable to find dom 'id'
                Ok () -> ( model, Cmd.none )
                    -- successfully focus the dom
        EditTodo id input ->
            ( { model
                | todoList = List.map (editTodo id input) model.todoList
              }
            , Cmd.none
            )

        EndEdit id editInput ->
            (
              { model | todoList = List.map (endEdit id) model.todoList },
              actionE "changeTodo" [("id", E.int id), ("content", E.string editInput)]
            )

        StateFromStore newTodoList ->
          ( Model "" (List.map withIsEditing newTodoList), Cmd.none )
        Same ->
            ( model, Cmd.none )

startEdit : Int -> Todo -> Todo
startEdit id todo =
    if todo.id == id then
        { todo | isEditing = True }

    else
        todo


editTodo : Int -> String -> Todo -> Todo
editTodo id input todo =
    if todo.id == id then
        { todo | editInput = input }

    else
        todo


endEdit : Int -> Todo -> Todo
endEdit id todo =
    if todo.id == id then
        { todo | isEditing = False }
    else
        todo



-- encodeMsg : Msg -> E.Value
-- encodeMsg msg =
--     case msg of
--         Input input -> (E.string ("Input" ++ input))
--         AddTodo -> (E.string "AddTodo")
--         Delete id -> (E.string ("Check: " ++ String.fromInt(id)))
--         Check id isCompleted -> (E.string ("Check: " ++ String.fromInt(id) ++ " "++ if isCompleted then "true" else "false"))
--         Same -> (E.string "Same")

-- View


view : Model -> Html Msg
view model =
    article [ class "card shadow-lg rounded-2xl p-4 max-w-lg" ]
        [ form [ class "p-0 m-0", onSubmit AddTodo ]
            [ label [ class "inline-block grow" ]
                [ span [] [ text "새로운 할일" ]
                , input [ type_ "text", class "input input-bordered w-full", placeholder "리액트 공부하기", value model.input, onInput Input ] []
                ]
            , button [ class "btn btn-primary", type_ "submit" ] [ text "추가" ]
            ]
        , ul [] (todoListView model.todoList)
        ]


mapKey : String -> Msg -> String -> Msg
mapKey key msg actual =
    if key == actual then
        msg

    else
        Same


onKeyup : String -> Msg -> Attribute Msg
onKeyup key msg =
    on "keyup" (D.map (mapKey key msg) (D.field "key" D.string))


todoItemView : Todo -> Html Msg
todoItemView todo =
    Html.li [ class "w-full mt-1 flex align-middle gap-2 p-1" ]
        [ input
            [ id ("todo-item-checkbox-" ++ String.fromInt todo.id)
            , type_ "checkbox"
            , class "checkbox"
            , checked todo.isCompleted
            , attribute "aria-label" "완료"
            , onClick (Check todo.id (not todo.isCompleted))
            , onKeyup "Space" (Check todo.id todo.isCompleted)
            ]
            []
        , form
            [ onSubmit (EndEdit todo.id todo.editInput)
            , class "flex flex-row w-full"
            ]
            (if todo.isEditing then
                [ input
                    [ id ("todo-edit-input-"++String.fromInt(todo.id))
                    , type_ "text"
                    , class "input input-bordered input-sm w-full"
                    , value todo.editInput
                    , onInput (EditTodo todo.id)
                    ]
                    []
                , button
                    [ type_ "submit"
                    , class "btn btn-primary btn-sm"
                    ]
                    [ text "수정" ]
                ]

             else
                [ label
                    [ class "label-text w-full pl-5"
                    , for ("todo-item-checkbox-" ++ String.fromInt todo.id)
                    ]
                    [ text todo.content ]
                , button
                    [ type_ "button"
                    , class "btn btn-primary btn-sm"
                    , onClick (StartEdit todo.id)
                    ]
                    [ text "수정" ]
                ]
            )
        , button
            [ type_ "button"
            , class "btn btn-error btn-sm"
            , onClick (Delete todo.id)
            ]
            [ text "삭제" ]
        ]


todoListView : List Todo -> List (Html Msg)
todoListView todoList =
    List.map todoItemView todoList
