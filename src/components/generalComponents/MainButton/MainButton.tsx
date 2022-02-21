import { useState } from 'react'
import './MainButton.css'
import { ReactSVG } from 'react-svg'

const MainButton = (props: any) => {

  const [isActive, setActive] = useState<Boolean>(false);

  if (props.altStyle1) {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-containerAlt1"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    )
  } else if (props.altStyle2) {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-containerAlt2"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    )
  } else if (props.altStyle3) {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-containerAlt3"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    )
  } else if (props.altStyle4) {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-containerAlt4"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    )
  } else if (props.altStyle5) {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-containerAlt5"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    )
  } else if (props.altStyle6) {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-containerAlt6"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    );
  } else if (props.altStyle7) {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-containerAlt7"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    );
  } else if (props.altStyle8) {
    return (
      <div className="mainButton-containerAlt8"
        style={{
          // opacity: props.disabled ? 0.4 : 1,
          backgroundColor: props.backgroundColor,
        }}
      >
        <p id={props.id}>{props.text}</p>
        {props.iconSvg &&
          <div style={{
            marginLeft: 10, display: props.display ? 'flex' : 'unset',
            position: props.display ? 'relative' : 'unset', top: 3
          }}>
            <ReactSVG src={props.iconSvg} />
          </div>
        }
      </div>
    );
  } else {
    return (
      <p
        id={props.id}
        onClick={() => {
          setActive(!isActive)
          if (!props.disabled) {
            props.onButtonPressed()
          }
        }}
        className="mainButton-container"
        style={{
          opacity: props.disabled ? 0.4 : 1
        }}
      >{props.text}</p>
    );
  }
}

export default MainButton;