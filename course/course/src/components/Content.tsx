import Part from "./Part"
import type { CoursePart } from "../App"

interface ContentProps {
    courseParts: CoursePart[],
}

const Content = (props: ContentProps) => {
  return (
    <>
    {
        props.courseParts.map(c => (
            <Part coursePart={c} />
        ))
    }
    </>
    
  )
}

export default Content