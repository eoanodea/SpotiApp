import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';


export class SongList extends React.Component {
    state = {
        songs: [
            {
                id: uuid(),
                name: 'bastille',
            },
            {
                id: uuid(),
                name: 'Mumford & sons',
            },
            {
                id: uuid(),
                name: 'The Weekend',
            },
        ]
    }



    render() {
        const { songs } = this.state;
        return (
            <Container>
                <Button style={{ marginBottom: '20px' }} onClick={() => {
                    const name = prompt('enter a song');
                    if (name) {
                        this.setState(state => ({
                            songs: [...state.songs, { id: uuid(), name }]
                        }));
                    }
                }}> Add a Song</Button>
                <ListGroup>
                    <TransitionGroup className="song-list">
                        {songs.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, id)}>
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}