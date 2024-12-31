export const ChaptersDrawerList = () => (
    <ul className='ChapterList flex flex-col gap-4'>
        <li>
            <p>Chapter 1</p>
            <ul className='PageList flex flex-col p-2 gap-4'>
                <li>
                    <p>page one</p>
                </li>
                <li>
                    <p>page two</p>
                </li>
                <li>
                    <p>page three</p>
                </li>
            </ul>
        </li>
        <li>
            <p>Chapter 2</p>
        </li>
        <li>
            <p>Chapter 3</p>
        </li>
    </ul> 
)