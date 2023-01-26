port module App exposing (main)

import Browser
import Html exposing (Attribute, Html, article, button, form, input, label, span, text, ul)
import Html.Attributes exposing (attribute, checked, class, for, id, placeholder, type_, value)
import Html.Events exposing (on, onClick, onInput, onSubmit)
import Json.Decode as D
import Json.Encode as E
import Maybe exposing (withDefault)
import Browser.Dom
import Task

main : Program (List { content : String, id : Int, isCompleted : Bool }) Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }



-- Model


type alias Todo =
    { content : String, id : Int, isCompleted : Bool, isEditing : Bool, editInput : String }


type alias Model =
    { input : String, todoList : List Todo }


init : List { content : String, id : Int, isCompleted : Bool } -> ( Model, Cmd Msg )
init initTodoList =
    ( Model "" (List.map withIsEditing initTodoList), Cmd.none )


withIsEditing : { content : String, id : Int, isCompleted : Bool } -> Todo
withIsEditing todo =
    { id = todo.id, content = todo.content, isCompleted = todo.isCompleted, isEditing = False, editInput = todo.content }


port jsonConsole : E.Value -> Cmd msg

port saveTodoList : E.Value -> Cmd msg

port focus : E.Value -> Cmd msg


-- UPDATE


saveResultWith : Model -> ( Model, Cmd Msg )
saveResultWith model =
    ( model, saveTodoList (encodeTodoList model.todoList) )


type Msg
    = Input String
    | AddTodo
    | Delete Int
    | StartEdit Int
    | EditTodo Int String
    | EndEdit Int
    | Check Int Bool
    | Same
    | FocusResult (Result Browser.Dom.Error ())


getId : Todo -> Int
getId todo =
    todo.id


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Input input ->
            ( { model | input = input }, Cmd.none )

        AddTodo ->
            if String.isEmpty model.input then
                ( model, Cmd.none )

            else
                saveResultWith
                    { model
                        | todoList =
                            model.todoList
                                ++ [ withIsEditing { id = withDefault 0 (List.maximum (List.map getId model.todoList)) + 1
                                     , content = model.input
                                     , isCompleted = False
                                     }
                                   ]
                        , input = ""
                    }

        Delete id ->
            saveResultWith
                { model
                    | todoList =
                        List.filter (isNotTarget id) model.todoList
                }

        Check id isCompleted ->
            saveResultWith
                { model
                    | todoList = List.map (completeTodo id isCompleted) model.todoList
                }

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

        EndEdit id ->
            saveResultWith
                { model
                    | todoList = List.map (endEdit id) model.todoList
                }

        Same ->
            ( model, Cmd.none )


isNotTarget : Int -> Todo -> Bool
isNotTarget id todo =
    not (id == todo.id)


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
        { todo | isEditing = False, content = todo.editInput }

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


encodeTodo : Todo -> E.Value
encodeTodo todo =
    E.object [ ( "id", E.int todo.id ), ( "content", E.string todo.content ), ( "isCompleted", E.bool todo.isCompleted ) ]


encodeTodoList : List Todo -> E.Value
encodeTodoList todoList =
    E.list encodeTodo todoList


completeTodo : Int -> Bool -> Todo -> Todo
completeTodo id isCompleted todo =
    if todo.id == id then
        { todo | isCompleted = isCompleted }

    else
        todo



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
            [ onSubmit (EndEdit todo.id)
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
