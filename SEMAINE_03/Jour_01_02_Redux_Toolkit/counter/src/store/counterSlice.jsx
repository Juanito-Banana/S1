import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

const TIMER = 1000;
const counter = (count) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(count);
    }, TIMER);
});

export const fetchCounter = createAsyncThunk("counter/ferchCount", async () => {
  const count = await counter(1);
  return count;
});

export const counterSLiceAsync = createSlice({
  name: "counterAsync",
  initialState : { count : 0},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCounter.pending, (state, action) => {
        
      });
    builder.addCase(fetchCounter.fulfilled, (state, action) => {
      state.count += action.payload;
    });
  },
});

const initialState = {
  number: 0,
  parity: "",
  step: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: {
      reducer: (state, action) => {
        const { number, parity, step } = action.payload;

        state.number += number;
        state.parity = parity;
        state.step = step;
      },
      // traitement sur le payload avant de passer dans l'action du reducer counter/increment ci-dessus
      prepare: () => {
        const alea = Math.floor(Math.random() * 10) + 1;

        return {
          payload: {
            number: alea,
            parity: alea % 2 ? "odd" : "even",
            step: alea,
          },
        };
      },
    },
  },
});

const starSlice = createSlice({
    name: 'star',
    initialState: {
        stars: [],
        number: null,
        numbers: []
    } ,
    reducers: {
        add: (state, action) => {
            const { number } = action.payload;
            state.stars.push('*');
            state.numbers.push(number)
        },
    },
});

const middlewares = [
    (store) => (next) => (action) => {
        const { step } = store.getState().c;

        if (action.type === "counter/increment") {
          if (true) {
            store.dispatch(starSlice.actions.add({ number: step }));
          }
        }

        // permet d'effectuer précisémment les actions dans le reducer si on ne fait pas ça rien ne se passe ...
        const returnAction = next(action);

        return returnAction; // TODO pourquoi faut il retourner les actions ???
      },
]

const store = configureStore({
  reducer: {
    c: counterSlice.reducer,
    ca: counterSLiceAsync.reducer,
    s : starSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([...middlewares]),
});

export const { increment } = counterSlice.actions;

export default store;
