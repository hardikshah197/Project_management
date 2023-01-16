import { StarFilled, StarOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export const BoardTitle = ({
    title,
    handleBoardClick,
    addition,
    handleBoardStarToggling,
    starred,
}) => (
    <div
        role="button"
        tabIndex="0"
        onKeyDown={() => {}}
        onClick={() => handleBoardClick()}
        className={`h-32 rounded-md p-2 font-semibold flex ${
            addition ? 'bg-gray-200 text-gray-900' : 'bg-blue-500 text-white justify-between'
        }`}
    >
        <div className={addition ? 'm-auto' : ''}>{title}</div>
        {!addition && (
            <div
                role="button"
                tabIndex="-1"
                className="flex"
                onClick={(e) => {
                    e.stopPropagation();
                    handleBoardStarToggling();
                }}
                onKeyDown={() => {}}
            >
                {starred ? (
                    <StarFilled className="transform transition-all text-white text-opacity-75 hover:text-opacity-100 hover:translate-x-px scale-100 hover:scale-110 mt-auto" />
                ) : (
                    <StarOutlined className="transform transition-all text-white text-opacity-75 hover:text-opacity-100 hover:translate-x-px scale-100 hover:scale-110 mt-auto" />
                )}
            </div>
        )}
    </div>
);

BoardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    addition: PropTypes.bool,
    handleBoardClick: PropTypes.func,
    handleBoardStarToggling: PropTypes.func,
    starred: PropTypes.bool,
};
