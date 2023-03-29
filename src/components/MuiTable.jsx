import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useGetPokemonListByGenerationQuery } from "../redux/api/pokemonAPI";
import {
  selectCurrentGeneration,
  selectCurrentPage,
} from "../redux/features/pokedex/pokedexSlice";
import { setPage } from "../redux/features/pokedex/pokedexSlice";
import ProgressiveImg from "./ProgressiveImg";
import ImgPlaceholder from "../assets/img_placeholder.jpg";
import Spinner from "./Spinner";

const MuiTable = () => {
  const dispatch = useDispatch();
  const currentGeneration = useSelector(selectCurrentGeneration);
  const page = useSelector(selectCurrentPage);
  const [data, setData] = useState([]);
  // const { data, isLoading, isSuccess, isError, error } =
  //   useGetPokemonListByGenerationQuery(currentGeneration);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      const generationData = await fetch(
        `https://pokeapi.co/api/v2/generation/${currentGeneration}`
      ).then((data) => data.json());

      const pokemonData = await Promise.all(
        generationData.pokemon_species.map((item) =>
          fetch(
            `https://pokeapi.co/api/v2/pokemon/${item.url.match(/\d+/g)[1]}`
          )
        )
      ).then((response) => Promise.all(response.map((r) => r.json())));

      setData(pokemonData);
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [currentGeneration]);

  const rowsPerPageOptions = [10, 20, 30, 50, 100];
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const headCells = [
    {
      id: "image",
      numeric: false,
      label: "Pokemon Image",
    },
    {
      id: "name",
      numeric: false,
      label: "Pokemon Name",
    },
    {
      id: "type",
      numeric: false,
      label: "Pokemon Type",
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    dispatch(setPage(0));
  };

  const createData = (name, image, type) => {
    return {
      name,
      image,
      type,
    };
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const SortableTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  let content;
  if (data.length > 0) {
    const rows = data?.map((pokemon) =>
      createData(
        pokemon.name,
        pokemon.sprites.front_default,
        pokemon.types.map((item) => item.type.name)
      )
    );

    const numberOfEmptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    content = (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <SortableTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={row.name}>
                        <TableCell component="th" id={labelId} scope="row">
                          {/* <Avatar
                            alt={row.name}
                            src={row.image}
                            sx={{ width: 70, height: 70 }}
                          /> */}
                          <ProgressiveImg
                            lowQualitySrc={ImgPlaceholder}
                            highQualitySrc={row.image}
                            img_alt={row.name}
                            img_width={70}
                          />
                        </TableCell>
                        <TableCell component="th">
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: "monospace",
                              fontWeight: 400,
                              color: "inherit",
                              textDecoration: "none",
                              textTransform: "capitalize",
                            }}
                          >
                            {row.name}
                          </Typography>
                        </TableCell>
                        <TableCell component="th">
                          {row.type.map((element, index) => (
                            <Typography
                              key={index}
                              variant="subtitle1"
                              sx={{
                                fontFamily: "monospace",
                                fontWeight: 400,
                                color: "inherit",
                                textDecoration: "none",
                                textTransform: "capitalize",
                              }}
                            >
                              {element}
                            </Typography>
                          ))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {numberOfEmptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 88 * numberOfEmptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  } else {
    content = <Spinner />;
  }

  return content;
};

export default MuiTable;
