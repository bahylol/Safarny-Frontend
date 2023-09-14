
export default function ActivityContent({
    heading,
    paragraph,
}) {
    return (
        <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
                {heading}
            </h2>
            <p className="mt-5 text-center text-sm text-base-content">
                {paragraph} {' '}
            </p>
        </div>
    )
}