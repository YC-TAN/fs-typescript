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
    switch (props.coursePart.kind) {
        case "basic":
            return (
            <p>
                {props.coursePart.name}
                {props.coursePart.exerciseCount}
                {props.coursePart.description}
            </p>)
        case "background":
            return (
            <p>
                {props.coursePart.name}
                {props.coursePart.exerciseCount}
                {props.coursePart.description}
                {props.coursePart.backgroundMaterial}
            </p>)
        case "group":
            return (
            <p>
                {props.coursePart.name}
                {props.coursePart.exerciseCount}
                {props.coursePart.groupProjectCount}                
            </p>)
        default:
            return assertNever(props.coursePart)
    }
}

export default Part