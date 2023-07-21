/* eslint-disable no-console */

export default function BasicTest({ state, setState, ydoc, ytext }) {
  // const onChangeHandler = (e) => {
  //   ydoc.current.transact(() => {
  //     ytext.current.delete(0, ytext.current.toString().length);
  //     ytext.current.insert(0, e.target.value);
  //   });
  // };

  // On Your Network: http://192.168.177.1:3000 로 들어가야 보임. localhost은 안보임
  return (
    <div>
      <div>
        <button type="button">add document</button>
      </div>
      {/* <input
        value={state}
        onChange={onChangeHandler}
        style={{ color: 'purple' }}
      /> */}
      {/* <p style={{ color: 'purple' }}>{state}</p> */}
    </div>
  );
}
