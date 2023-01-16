import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Board from 'react-trello';
import { boardService } from '../application/services';
import { withAuthorization } from '../auth/auth-hoc';
import { BoardSkeleton } from '../components/BoardSkeleton';

export const BoardPage = withRouter(
    withAuthorization((authUser) => !!authUser)((props) => {
        const [board, setBoard] = useState({
            lanes: [],
        });
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            (async () => {
                setLoading(true);
                await fetchBoard();
                setLoading(false);
            })();
        }, []);

        const fetchBoard = async () => {
            const data = (await boardService.getBoard(boardId())).val();
            setBoard(prepareBoard(data));
        };

        // Fill empty properties that are important for Board component
        const prepareBoard = (board) => ({
            ...board,
            lanes: (board?.lanes || []).map((lane) => ({
                ...lane,
                cards: lane?.cards || [],
            })),
        });

        const boardId = () => props.match?.params?.board;

        const handleDataChange = async (data) => await boardService.updateBoard(boardId(), data);

        if (loading) {
            return <BoardSkeleton count={5} />;
        }

        return (
            <Board
                className={`pt-16 bg-blue-500 h-full`}
                canAddLanes={true}
                editable={true}
                data={{
                    lanes: board.lanes || [],
                }}
                onDataChange={handleDataChange}
            />
        );
    })
);
