import { useState } from 'react';
import "./CommentForm.css"

const CommentForm = ({ handleAddComment }) => {
  // State
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handleAddComment
    handleAddComment(formData)
    setFormData({ text: '' });
  };

  return (
    <div className="comments">
    <form onSubmit={handleSubmit}>

      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">comment</button>
    </form>
    </div>
  );
};


export default CommentForm;
