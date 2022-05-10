const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task, index) => {
        return (
          <div key={task.userId + index}>
            {/* Task Label: {task.title} <br />
            Task Body: {task.body} */}
            <tr>
                <th>UserID</th>
                <th>Title</th>
                <th>Body</th>
                </tr><tr>
                <th>{task.userId}</th>
                <th>{task.title}</th>
                <th>{task.body}</th>
            </tr>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
