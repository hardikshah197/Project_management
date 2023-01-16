import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { nanoid } from 'nanoid';

export const BoardSkeleton = (props) => {
    const boardTitles = Array(props.count).fill({});

    return (
        <div className={`pt-16 bg-blue-500 h-full`}>
            <div className="grid grid-cols-5 gap-2.5  ml-2.5 mr-2.5">
                {boardTitles.map((id) => (
                    <div className="bg-gray-200 rounded pl-4 pr-3 pt-3" key={nanoid()}>
                        <Skeleton height="1rem" />
                        <Skeleton height="4rem" className="mt-4" />
                        <Skeleton height="4rem" className="mt-2 mb-10" />
                    </div>
                ))}
            </div>
        </div>
    );
};

BoardSkeleton.propTypes = {
    count: PropTypes.number.isRequired,
};
