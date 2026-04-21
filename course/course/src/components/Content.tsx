interface Course {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    courses: Course[],
}

const Content = (props: ContentProps) => {
  return (
    <>
    {
        props.courses.map(c => (
            <p key={c.name}>{c.name} {c.exerciseCount}</p>
        ))
    }
    </>
    
  )
}

export default Content