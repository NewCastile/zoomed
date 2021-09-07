import classNames from "classnames"

const Error = ({touched, message}) => {
    if (!touched) {
        return <div className={classNames("form-message", "invalid")}>&nbsp;</div>
    }
    if (message) {
        return <div className={classNames("form-message", "invalid")} style={{color: "#ac41b0", padding: "0px 12px"}}>{message}</div> 
    }
    return <div className={classNames("form-message", "valid")} style={{color: "#3649eb", padding: "0px 12px"}}>all good</div>
}

export default Error