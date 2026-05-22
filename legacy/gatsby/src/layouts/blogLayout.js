/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

 import React from "react"
 import PropTypes from "prop-types"
 import { StaticQuery, graphql } from "gatsby"
 
 import "./../styles/main.css"
 
 import Header from "./../components/header"
 
 const BlogLayout = ({ children }) => (
	 <StaticQuery
		 query={graphql`
			 query BlogTitleQuery {
				 site {
					 siteMetadata {
						 title
					 }
				 }
			 }
		 `}
		 render={data => (
			 <>
				 <Header siteTitle={ data.site.siteMetadata.title } />
				 <div className="main">
					 <div className="content-wrapper">
						 { children }          
					 </div>
				 </div>
			 </>
		 )}
	 />
 )
 
 BlogLayout.propTypes = {
	 children: PropTypes.node.isRequired,
 }
 
 export default BlogLayout
 