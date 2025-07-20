import { useEffect, useState } from "react";
import { getQuestions, deleteQuestion, updateQuestionApproval } from "../../services/questionServices";
import { getUsers, updateUserIsStaff } from "../../services/quizServices";


export const Admin = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getQuestions().then(setAllQuestions),
      getUsers().then(setAllUsers)
    ])
      .finally(() => setLoading(false));
  }, []);

  const handleApprovalChange = (questionId, value) => {
    updateQuestionApproval(questionId, value).then(() => {
      setAllQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, approved: value } : q))
      );
    });
  };

  const handleDelete = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      deleteQuestion(questionId).then(() => {
        setAllQuestions((prev) => prev.filter((q) => q.id !== questionId));
      });
    }
  };

  const handleAdminToggle = (userId, isAdmin) => {
    updateUserIsStaff(userId, isAdmin).then(() => {
      setAllUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_staff: isAdmin } : u))
      );
    });
  };

  if (loading) {
    return <div className="m-4">Loading data...</div>;
  }
  else
  return (
    <div className="columns m-4">
      <div className="column is-two-thirds">
        <h2 className="title is-4">Questions</h2>
        <p>Total :{allQuestions.length}</p>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Body</th>
              <th>Answer</th>
              <th>Categories</th>
              <th>Approved</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allQuestions.map((q) => (
              <tr key={q.id}>
                <td>{q.body}</td>
                <td>{q.answer ? "True" : "False"}</td>
                <td>{q?.categories?.map((cat, index) => (
                        <span key={cat.id}>
                          {cat.name}
                          {index < q.categories.length - 1 ? ", " : ""}
                        </span>
                      ))}</td>
                <td>
                  <label className="radio mr-2">
                    <input
                      type="radio"
                      name={`approved-${q.id}`}
                      checked={q.approved === true}
                      onChange={() => handleApprovalChange(q.id, true)}
                    />
                    <span className="ml-1">Yes</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={`approved-${q.id}`}
                      checked={q.approved === false}
                      onChange={() => handleApprovalChange(q.id, false)}
                    />
                    <span className="ml-1">No</span>
                  </label>
                </td>
                <td>
                  <button
                    className="button is-danger is-small"
                    onClick={() => handleDelete(q.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users Table (1/3 width) */}
      <div className="column is-one-third">
        <h2 className="title is-4">Users</h2>
        <p> Total: {allUsers.length}</p>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Username</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  <label className="radio mr-2">
                    <input
                      type="radio"
                      name={`admin-${user.id}`}
                      checked={user.is_staff === true}
                      onChange={() => handleAdminToggle(user.id, true)}
                    />
                    <span className="ml-1">Yes</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name={`admin-${user.id}`}
                      checked={user.is_staff === false}
                      onChange={() => handleAdminToggle(user.id, false)}
                    />
                    <span className="ml-1">No</span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};