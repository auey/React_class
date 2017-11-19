import React from 'react'
import localStorage from 'localStorage'

import { publishPost, getAllPosts } from '../api'

class Main extends React.Component {
  state = {
    title: '',
    content: '',
    allPosts: []
  }

  onTextChange = event => {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  submitPost = event => {
    event.preventDefault()

    publishPost(this.state.title, this.state.content) 
      .then(() => { this.getPosts() })
  }

  getPosts = () => {
    getAllPosts()  //มาจากapi แล้วเก็บไว้ใน state ไว้render
      .then(data => this.setState({ allPosts: data }))  //set Stateให้ allpost
      .catch(err => console.error('Something went wrong.'))
  }

  signout = event => {
    localStorage.clear()
    this.props.history.replace('/')
  }

  componentDidMount() {  //หลังจาก render เสร็จ
    this.getPosts()
  }

  render() {
    const posts = this.state.allPosts  //ทำอะไรกับ post ตัวนี้ก็ได้
    return (
      <div style={{ width: '800px' }}>
        <h2 className="ui center aligned icon header">
          <i className="circular teal users icon" />
          Welcome again, {localStorage.getItem('username')}
        </h2>
        
        <form class='ui form' onSubmit={this.submitPost}>
          <div className='field'>
            <input type='text' name='title' value={this.state.title} placeholder='Title' onChange={this.onTextChange} />
          </div>
          <div className='field'>
            <textarea 
              name='content' 
              placeholder='Write your post...' 
              value={this.state.content}
              onChange={this.onTextChange} />
            <button className='ui primary button' style={{ margin: '16px 0'}}>Publish Post</button>
          </div>
        </form>

        { posts.length >= 0 ?  //การแสดง post มาจาก api ที่อยู่ใน {} , ,มีpost ถึงค่อยแสดงหมดเลย
          posts.map(post => //รับpost ทีละpost 
            //แล้วเอา div ครอบของทีละตัว แล้วจะได้เป็นlist
            <div className='ui segment'> 
              <p>Published by: {post.author}</p>
              <div>
                Title: {post.title}
              </div>
              <div>
                {post.content}
              </div>
            </div>
          ) // ถ้าเป็น TRUE ทำถึงก่อน ;
          : null // เป็น false ทำหลัง ;
        }
          

        {/* [1 , 2].map(number => number + 1) ---> [2 , 3]*/}

        <button onClick = {this.signout} classname="ui button">Sign out</button>
      </div>
    )
  }
}

export default Main