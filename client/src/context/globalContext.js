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
    toast.success(message);
  },
  toastError: (message) => {
    toast.error(message);
  },
  toastLoading: (message) => {
    toast.loading(message);
  },
  toaster: <Toaster />,
}));

export const searchPet = create((setState) => ({
  pets: [],
  filteredPets: [],
  searchTerm: '',
  genderFilter: '',
  speciesFilter: '',

  setPets: (pets) => setState((state) => ({
    pets,
    filteredPets: state.applyFilters(pets, state.searchTerm, state.genderFilter, state.speciesFilter)
  })),

  setSearchTerm: (term) => setState((state) => ({
    searchTerm: term,
    filteredPets: state.applyFilters(state.pets, term, state.genderFilter, state.speciesFilter)
  })),

  setGenderFilter: (gender) => setState((state) => ({
    genderFilter: gender,
    filteredPets: state.applyFilters(state.pets, state.searchTerm, gender, state.speciesFilter)
  })),

  setSpeciesFilter: (species) => setState((state) => ({
    speciesFilter: species,
    filteredPets: state.applyFilters(state.pets, state.searchTerm, state.genderFilter, species)
  })),

  applyFilters: (pets, searchTerm, gender, species) => {
    return pets.filter(pet => {
      return (
        (!searchTerm || pet.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!gender || pet.gender === gender) &&
        (!species || pet.species === species)
      );
    });
  },
}))