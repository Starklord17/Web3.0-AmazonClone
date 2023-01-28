import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {

    return (
        <nav>
            {account}
        </nav>
    );
}

export default Navigation;