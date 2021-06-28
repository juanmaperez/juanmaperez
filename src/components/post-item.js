import React from 'react';
import { Link } from 'gatsby'
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';

const PostItemView = styled.div`
margin: 40px auto 20px;
padding: 0px 20px;
box-sizing: border-box;
width: 50%;
@media(max-width:1590px){ width: 50%  }
@media(max-width:1100px){ width: 55%  }
@media(max-width:878px){ width: 65%  }
@media(max-width:510px){
  width:98%;
  margin: 40px auto 0px;
  padding: 10px;
}
.post-wrapper {
  height: 100%;
  opacity: 0;
  transition: opacity 600ms linear;
  &.fade-in {
    opacity: 1;
  }
  .post-icon {
    margin-right: 5px;
    width: 8px;
    height: 16px ;
    background: url(${props=> props.icon});
    border-radius: 50%/25%;
    background-size: cover;
    background-position:center 1px;
    background-repeat: no-repeat;
    overflow: hidden;    
    background-color: transparent; 
    z-index: 10;
  }
  .post-date {
    align-items: center;
    display: flex;
    margin: 10px 0px 0px;
    font-size: 12px;
    color: var(--primaryColor);
  } 
  .post-title {
    align-items: center;
    display: flex;
    margin: 20px 0px 20px;
    padding: 0px;
    font-weight: 800;
    line-height: 1.2;
    font-size: 26px;
    color: var(--tertiaryColor);
    font-family: 'Montserrat', sans-serif;
    @media(max-width:510px){ font-size: 26px }

    a {
      text-decoration: none;
      color: var(--tertiaryColor) !important;
    }
  }
  .post-excerpt {
    display: block;
    font-size: 15px;
    font-weight: regular;
    margin: 3px 0 0;
    line-height:1.5;
    color:  var(--primaryColor);
    font-weight: normal;
  } 
  
}
`

const PostItem = (props) => {
  const { frontmatter, listPath } = props;


  return (
  <PostItemView icon={ frontmatter.icon.childImageSharp.fluid.src }>
    <Controller>
      <Scene classToggle={'fade-in'} triggerHook={0.85}>
        <div className="post-wrapper" >
          <div className="post-container">
            <h2 className="post-title">
              <Link to={frontmatter.path} state={{prevPath: listPath }}> {frontmatter.title} </Link>
            </h2>
            <div className="post-date">
              <Link to={`/category/${frontmatter.category}`}><img width="10" src={frontmatter.icon.childImageSharp.fluid.src} alt={frontmatter.category}/></Link>
              &nbsp;<span>{frontmatter.date}</span>
            </div>
            <div className="post-excerpt">
              {frontmatter.excerpt}
            </div>
          </div>
        </div>
      </Scene>
    </Controller>
  </PostItemView>
)};

export default PostItem;