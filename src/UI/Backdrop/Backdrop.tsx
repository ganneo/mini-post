import classes from "./Backdrop.module.css";

interface BackdropProps {
  show: boolean;
  clickEvent: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  let BackdropClass = [classes.Backdrop];

  if (props.show) {
    BackdropClass.push(classes.Active);
  }

  return (
    <div className={BackdropClass.join(" ")} onClick={props.clickEvent}>
      {props.children}
    </div>
  );
};

export default Backdrop;
