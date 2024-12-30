const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			logout: ()=> {
				localStorage.removeItem('token')
				setStore({auth: false, token: null})
			},
			getUserData: async () => {
				try {
					const resp = await fetch('https://literate-telegram-wr99gvxjr7673g6v7-3001.app.github.dev/api/protected',{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
						})
					if (!resp.ok) throw new Error ('Error al registrarse')
					const data = await resp.json()
					console.log(data)
					setStore({user: user.data})

				} catch (error) {
					console.log(error);
				}
			},
			
			register : async (FormData) => {
				try {
					const resp = await fetch('https://literate-telegram-wr99gvxjr7673g6v7-3001.app.github.dev/api/register',{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(FormData)
						})
					if (!resp.ok) throw new Error ('Error al registrarse')
					const data = await resp.json()
					console.log(data)
					localStorage.setItem ('token', data.token)
					setStore({auth: true, token: token.data})
				} catch (error) {
					console.log(error);
				}
			},
			login: async FormData => {
				try {
					const resp = await fetch('https://literate-telegram-wr99gvxjr7673g6v7-3001.app.github.dev/api/login',{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(FormData)
						})
					if (!resp.ok) throw new Error ('Error al registrarse')
					const data = await resp.json()
					console.log(data)
				} catch (error) {
					console.log(error);
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
