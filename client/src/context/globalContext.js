import { create } from "zustand";
import toast, { Toaster } from "react-hot-toast";

export const authUserStore = create((setState) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => {
    return Promise.resolve(setState({ isAuthenticated: true, user: user }));
  },
  logout: () => {
    setState({ isAuthenticated: false, user: null });
  },
}));

export const loaderData = create((setState) => ({
  loadingData: true,
  loadingDataComplete: () => {
    setState({ loadingData: false });
  },
}));

export const toastData = create((setState) => ({
    toastSuccess: (message) => {
        toast(message, {
            icon: "👌",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        });
    },
    toastError: (message) => {
        toast.error(message, {
            // icon: "🚩🛑",
            icon: "❌",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        });
    },
    toastLoading: (message) => {
        toast.loading(message);
    },
    toaster: <Toaster />,
}));

export const searchPet = create((setState) =>({
  pets :[],
  searchTerm:'',
  setPets :(pets) => setState({pets}),
  setSearchTerm:(term) => setState({ searchTerm: term })
}))