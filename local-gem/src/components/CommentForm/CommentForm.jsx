import { useState } from 'react'

const CommentForm = ({ handleAddComment }) => {
  // State
  const [formData, setFormData] = useState({ text: '' })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // handleAddComment
    handleAddComment(formData)
    setFormData({ text: '' })
  }

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
<<<<<<< HEAD
    </div>
  );
};


export default CommentForm;
=======
  )
}

export default CommentForm
>>>>>>> cf9e382c020991e7ebc6ce72e2900b08ce0de638
