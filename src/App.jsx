import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  // ❶　TODOを追加するためのstateの定義
  const [todoText, setTodoText] = useState("");

  // useState関数の中から配列の分割代入で取り出す。
  // 取り出すものはstateとして取り出す変数名（自由に名前をつけることができる→これがstate名）、変数（staete）を変更するための関数を定義する
  // ここでの関数はset変数名とするのが一般的
  // useStateのカッコの中で,定義した変数(state)の初期値を入れることができる.今回は空文字で[]だけ
  // 関数名（）のカッコ内に変数に設定したい値（例　’変数名＋１’）を入れると変数の値が更新される
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //❹　追加ボタンに値が入力されたときに処理が実行される関数の定義
  // 入力値の取得は、onChangeイベントの関数にeventという引数を追加し、event.target.valueとすると取得できる。
  // 詳しく理解する必要がありませんので、eventとevent.target.valueはセットで覚える。
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 2 追加ボタンを押したときに処理を行う関数の定義
  const onClickadd = () => {
    // 入力欄になにもないときは追加ボタンを押しても何も起こらないようにする
    if (todoText === "") return;
    // 追加ボタンを押したときに入力された新しい値を未完了リストの変数incompleteTodosに入れる
    // スプレット構文を用いる。現在incompleteTodosに入っている要素の後ろに新しい値（todoText）を追加し、リスト化する
    const newTodos = [...incompleteTodos, todoText];
    // incompleteTodosを更新
    setIncompleteTodos(newTodos);
    // 追加されたら入力欄を殻にする
    setTodoText("");
  };

  // 弐　削除ボタンに対する関数の定義
  // 実行元のindexに入った値をここで受け取ってその値に対して処理を実行する
  const onClickdelete = (index) => {
    const newTodos = [...incompleteTodos];
    // spriceメソッドは１つ目の引数に何番目の要素かを受け取り、２つの要素にいくつ削除するかを指定できる
    newTodos.splice(index, 1);
    //
    setIncompleteTodos(newTodos);
  };

  // Ⅱ　　完了ボタンに対する関数の定義
  // 実行元のindexに入った値をここで受け取ってその値に対して処理を実行する
  // 流れとしては　完了ボタンをクリックする→その行が未完了から削除される→その行が完了に追加される
  const onClickComplete = (index) => {
    // 未完了からの削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // 完了への追加
    // すでにある完了リストの後ろに未完了リストから完了に変更された要素を追加（incompleteTodos[index]）
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    // 以下２行で更新
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 二　戻すボタンに対する関数の定義
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          // ❷　todoTextの値をinputのvalueに追加
          // ↑の処理だけだと、常にvalueに空文字が入る設定になっているため、inputに変更があったらstateの値も変更する処理が必要
          value={todoText}
          // ❸フォームの入力や削除が行われたときに処理を実行するには、onChangeイベントを用いる。入力されるとonChangeイベントが発生する
          // onChangeTodoText関数の呼び出し
          onChange={onChangeTodoText}
        />
        {/* １　onClickイベントの追加 */}
        <button onClick={onClickadd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {/* mapの変数（todo）の中にincompleteTodosの配列要素が順番に入ってくる */}
          {/* map関数は第一引数に要素の実際の値、第二引数にインデックス番号を取ることができる */}
          {incompleteTodos.map((todo, index) => {
            return (
              // map関数などを用いるときは必ずkeyを設定する
              <div key={todo} className="list-row">
                <li>{todo}</li>
                {/* Ⅰ　　↓３行のコメントアウトと同じ */}
                <button onClick={() => onClickComplete(index)}>完了</button>
                {/* 壱　　関数に引数を渡す場合は新たに関数を定義するイメージでアロー関数を用いる */}
                {/* 削除ボタンを押したときにそれが何番目の要素なのか判断できる */}
                {/* ２番目を押したらindexに２が入る */}
                <button onClick={() => onClickdelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div class="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                {/* 一　削除ボタンに同じ */}
                <button
                  onClick={() => {
                    onClickBack(index);
                  }}
                >
                  戻す
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
