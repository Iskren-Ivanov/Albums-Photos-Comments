import React from 'react';
import './Home.css';

const Home = () => {


    return (
        <div className="home">
            <div class="primary">
                <h1 class="display-4">Lorem Ipsum</h1>
                <p class="lead">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                <hr class="my-4" />
                <p>Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" href="https://www.lipsum.com/" target="_blank" role="button">Learn more</a>
                </p>
                <footer>
                    <p>All rights reversed &copy; 1900-3400 </p>
                </footer>
            </div>
        </div >
    );
};

export default Home;
