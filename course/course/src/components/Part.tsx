import { type CoursePart } from "../App"

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

interface PartProps {
    coursePart: CoursePart
}

const Part = (props: PartProps) => {
    const renderContent = () => {
        switch (props.coursePart.kind) {
            case "basic":
                return (
                <>
                    <i>{props.coursePart.description}</i>
                </>)
            case "background":
                return (
                <>
                    <i>{props.coursePart.description}</i>
                    <br />submit to {props.coursePart.backgroundMaterial}
                </>)
            case "group":
                return (
                <>
                    project exercises {props.coursePart.groupProjectCount}                
                </>)
            case "special":
                return (
                <>                    
                    <i>{props.coursePart.description}</i>
                    <br/>
                    Required skills: {props.coursePart.requirements.join(", ")}
                </>)
            default:
                return assertNever(props.coursePart)
        }
    }
    return (
        <p>
            <strong>{props.coursePart.name} {props.coursePart.exerciseCount}</strong>
            <br />
            {renderContent()}
        </p>
    )
}

export default Part