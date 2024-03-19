import * as React from 'react'
import redux from 'seed/redux';

import { lcs } from "components/util/Locales"
import List from 'components/canvas_forms/comments/List'
import c from 'resources/css/canvas_forms/Comments.module.css'

class Comments extends React.Component
{
  render()
  {
    const { area_id, canvas_id } = this.props.match.params;
    const { canvases } = this.props;
    let canvas = canvases.filter(canvas => canvas.id == canvas_id)[0];
    let projectId = canvas ? canvas.project_id : 0
    const comments = this.props.comments.filter(
      comment => comment.area_id == area_id && comment.project_id == projectId);

    return (
      <div className={c.module}>
        <div className={c.listContainer}>
          <List
            commentsD={comments}
            onDelete={this.onDelete} />
        </div>
        <div className={c.formContainer}>
          <form onSubmit={this.onSubmit}>
            <textarea name="text" placeholder={lcs("write_your_comment")} required />
            <button type="submit">{lcs("save")}</button>
          </form>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount()
  {
    const { area_id, canvas_id } = this.props.match.params;
    const { canvases } = this.props;
    let canvas = canvases.filter(canvas => canvas.id == canvas_id)[0];
    let projectId = canvas ? canvas.project_id : 0
    this.props.getCommentList({ area: area_id, project: projectId });
  }

  onSubmit = e =>
  {
    e.preventDefault();
    const { area_id, canvas_id } = this.props.match.params;
    const { canvases } = this.props;
    let text = e.target.text.value;
    let canvas = canvases.filter(canvas => canvas.id == canvas_id)[0];
    let projectId = canvas ? canvas.project_id : 0
    const comment = {
      text: text,
      hypothesis_id: null,
      area_id: area_id,
      project_id: projectId,
      creator_id: sessionStorage.getItem('id')
    }
    e.currentTarget.reset();
    this.props.saveComment(comment);
  }

  onDelete = e =>
  {
    const commentId = e.currentTarget.title;
    this.props.deleteComment(commentId);
  }
}

export default redux(Comments);