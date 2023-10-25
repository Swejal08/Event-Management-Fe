import Link from 'next/link'

const SessionHeadingButtons = () => {
  return (
    <div className="mt-3 md:mt-0 flex gap-2">
      <Link
        href={`/session/add`}
        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
      >
        Add Session
      </Link>
    </div>
  )
}

export default SessionHeadingButtons
