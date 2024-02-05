import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


import { TodoList } from "../../js/component/TodoListFetch.jsx";


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todo List Fetch</h1>
			<TodoList/>
		</div>
	);
};

export default Home;
