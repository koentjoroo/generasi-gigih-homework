import style from "./style.module.css";

const Card = props => (
  <div className={`${style.card} ${props.extraClass}`} >
    {props.children}
  </div>
);

export default Card;
