import { GET_CARDS_URL } from "../consts/api.consts";
import { CardsApiResponse } from "../interfaces/card";

interface FetchCardsArguments {
  page?: number;
  search?: string;
};

export const fetchCards = async (fetchArguments: FetchCardsArguments) => {
  const {page, search} = fetchArguments;
  const res = await fetch(
    `${GET_CARDS_URL}?pageSize=20&page=${page || 1}${
      search ? `&q=name:${search}*` : ""
    }`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  });

  return res as CardsApiResponse;
};
