import { ethers } from 'ethers'

// Components
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />
            <div className='cards'>
                {items.map((item, index) => (
                    <p>{item.name}</p>
                ))}
            </div>

        </div>
    );
}

export default Section;