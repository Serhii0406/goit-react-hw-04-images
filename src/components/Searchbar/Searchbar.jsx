import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';

import {
  Header,
  Form,
  SearchButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      toast.warn('Enter words to search for');
      return;
    }
    onSubmit(search);
  };

  const handleChange = event => {
    setSearch(event.target.value.toLowerCase());
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BiSearch size={28} />
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={handleChange}
          value={search}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};