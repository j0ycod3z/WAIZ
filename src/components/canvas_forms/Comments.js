import { useEffect } from 'react'
import redux from 'seed/redux';

import { lcs } from "components/util/Locales"
import List from 'components/canvas_forms/comments/List'

import c from 'components/canvas_forms/Comments.module.scss'

function Comments(props) {
  const { match, canvases, comments, getCommentList } = props;
  const { area_id, canvas_id } = match.params;

  const canvas = canvases.find(canvas => canvas.id == canvas_id);
  const projectId = canvas ? canvas.project_id : 0

  const filteredComments = comments.filter((comment) => comment.area_id === parseInt(area_id) && comment.project_id === projectId);

  useEffect(() => {
    getCommentList({ area: area_id, project: projectId });
  }, [area_id, canvas_id, canvases]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    const comment = {
      text: e.target.text.value,
      hypothesis_id: null,
      area_id,
      project_id: projectId,
      creator_id: sessionStorage.getItem('id')
    }

    e.currentTarget.reset();
    props.saveComment(comment);
  };

  const onDelete = (e) => {
    const commentId = e.currentTarget.title;
    props.deleteComment(commentId);
  };

  return (
    <div className={c.module}>
      <div className={c.listContainer}>
        <List
          commentsD={filteredComments}
          onDelete={onDelete}
        />
      </div>
      <div className={c.formContainer}>
        <form onSubmit={onSubmit}>
          <textarea name="text" placeholder={lcs("write_your_comment")} required />
          <button type="submit">{lcs("save")}</button>
        </form>
      </div>
    </div>
  );
}

export default redux(Comments);