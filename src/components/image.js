import React from "react"
import PropTypes from "prop-types"


const Image = ({title, imageUrl}) => (
    <img alt={ title } src={ imageUrl } />
)

Image.propTypes = {
  title: PropTypes.string,
  imageUrl:PropTypes.string
}


export default Image