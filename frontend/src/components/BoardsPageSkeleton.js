import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const BoardsPageSkeleton = (props) => {
    const boardTitles = Array(props.count).fill({});

    return (
        <div className={`pt-16 py-4 px-3`}>
            <div className="flex mb-3 items-center text-xl">
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton width={200} className="ml-5" />
            </div>

            <div className="grid grid-cols-4 gap-4">
                {boardTitles.map((id) => (
                    <div className="rounded-md h-32" key={nanoid()}>
                        <Skeleton height="8rem" />
                    </div>
                ))}
            </div>
        </div>
    );
};

BoardsPageSkeleton.propTypes = {
    count: PropTypes.number.isRequired,
};
