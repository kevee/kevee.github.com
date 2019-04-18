import React from 'react'
import styled from '@emotion/styled'
import bp from '../../style/breakpoints'
import images from './images'
import VisuallyHidden from '@reach/visually-hidden'

const speed = 140

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

const FlipbookRestartButton = styled('button')`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: transparent;
  color: #fff;
  text-decoration: underline;
  border: 0;
  z-index: 1000;
  cursor: pointer;
`

const FlipbookCorrection = styled('span')`
  color: #af2424;
`

class FrontpageHero extends React.Component {
  state = {
    currentImage: 0,
    count: 0,
    animationComplete: false,
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation() {
    this.setState({
      animationComplete: false,
      currentImage: 0,
    })
    this.interval = setInterval(() => {
      if (this.state.currentImage < images.length - 1) {
        this.setState(state => ({
          currentImage: state.currentImage + 1,
        }))
      } else {
        this.stopAnimation()
      }
    }, speed)
  }

  stopAnimation() {
    this.setState(state => ({
      animationComplete: true,
    }))
    clearInterval(this.interval)
  }

  componentWillUnmount() {
    this.stopAnimation()
  }

  render() {
    const { count, currentImage, animationComplete } = this.state
    return (
      <FlipbookContainer>
        <FlipbookName>
          Hi,{' '}
          {currentImage < 30 ? (
            <>I'm</>
          ) : (
            <>
              <strike>I'm</strike>{' '}
              <FlipbookCorrection>I was</FlipbookCorrection>
            </>
          )}
          <br />
          Kevin Miller
        </FlipbookName>
        <VisuallyHidden>
          This page includes a flipbook animation of me sitting in a bathtub,
          minding my own business, when a tentacle appears and drags me under
          the water.
        </VisuallyHidden>
        {animationComplete && (
          <FlipbookRestartButton onClick={this.startAnimation.bind(this)}>
            Replay
          </FlipbookRestartButton>
        )}
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
