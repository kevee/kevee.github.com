import React from 'react'
import styled from '@emotion/styled'
import bp from '../../style/breakpoints'
import images from './images'

const speed = 150

const FlipbookContainer = styled('div')`
  ${bp({
    height: ['400px', '75vh'],
  })}
  position: relative;
  width: 100%;
`

const FlipbookImage = styled('img')`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${props => (props.isActive ? `display: block;` : `display: none`)}
`

const FlipbookName = styled('h1')`
  font-size: 50px;
  font-family: Public Sans black;
  position: absolute;
  top: 40px;
  left: 20px;
  z-index: 1000;
  max-width: 400px;
`

class FrontpageHero extends React.Component {
  state = {
    currentImage: 0,
    count: 0,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.currentImage < images.length - 1) {
        this.setState(state => ({
          currentImage: state.currentImage + 1,
        }))
      } else {
        this.setState(state => ({
          currentImage: 0,
        }))
      }
    }, speed)
  }

  componentWillUnmount() {
    //clearInterval(this.interval)
  }

  render() {
    const { count, currentImage } = this.state
    return (
      <FlipbookContainer>
        <FlipbookName>Hi, I'm Kevin Miller</FlipbookName>
        {count < images.length && (
          <FlipbookImage src={images[0]} isActive={true} alt="" />
        )}
        {images.map((image, index) => (
          <FlipbookImage
            key={index}
            isActive={currentImage === index}
            src={image}
            alt=""
            onLoad={() => {
              this.setState({
                count: this.state.count + 1,
              })
            }}
          />
        ))}
      </FlipbookContainer>
    )
  }
}

export default FrontpageHero
