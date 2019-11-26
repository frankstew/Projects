import java.util.ArrayList;
import edu.princeton.cs.algs4.StdRandom;
public class Board {

    private final int[][] board;
    private int twini1;
    private int twini2;
    private int twinj1;
    private int twinj2;

    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    public Board(int[][] tiles) {
        // setting the board tiles
        int[][] theseTiles = new int[tiles.length][tiles.length];
        for (int i = 0; i < tiles.length; i++) { 
            for (int j = 0; j < tiles.length; j++) {
                theseTiles[i][j] = tiles[i][j];
            }
        }
        this.board = theseTiles;

        // determining random indices for twin swapping so that twin always retuns same twin
        int n = tiles.length;
        this.twini1 = StdRandom.uniform(n);
        this.twinj1 = StdRandom.uniform(n);
        while (this.board[this.twini1][this.twinj1] == 0) {
            this.twini1 = StdRandom.uniform(n);
            this.twinj1 = StdRandom.uniform(n);
        }
        this.twini2 = StdRandom.uniform(n);
        this.twinj2 = StdRandom.uniform(n);

        while ((this.twini1 == this.twini2 && this.twinj1 == this.twinj2) || this.board[this.twini2][this.twinj2] == 0) {
            this.twini2 = StdRandom.uniform(n);
            this.twinj2 = StdRandom.uniform(n); //always this loop gets inf.for 2x2
        }
    }
                                           
    // string representation of this board, making it look pretty
    public String toString() {
        String s = "\n" + " " + Integer.toString(this.board.length) + "\n\n" + "  ";
        for (int i = 0; i < this.board.length; i++) {
            for (int j = 0; j < this.board[i].length; j++) {
                s = s + Integer.toString(this.board[i][j]) + " ";
            }
            if (i == this.board.length-1) {
                s = s + "\n\n";
                break;
            }
            s = s + "\n\n" + "  ";
        }

        return s;
    }

    // board dimension n
    public int dimension() {
        return this.board.length;
    }

    // number of tiles out of place
    public int hamming() {
        int n = this.dimension();
        int cnt = 0;
        // (col-1) + (row-1)*this.n + 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == n-1 && j == n-1) {
                    break;
                }
                int correctTile = j + (i * n) + 1;
                if (this.board[i][j] != correctTile) {
                    cnt++;
                }
            }
        }
        return cnt;
    }

    // sum of Manhattan distances between tiles and goal
    public int manhattan() { 
        // how desired placement of tiles is calculated:
        // x = (index - 1) / height, x == i
        // y = (index - 1) % height, y == j
        int totalDist = 0;
        int n = this.dimension();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int tile = this.board[i][j];
                if (tile == 0) { // once its done, play around with making 0 count too
                    continue;
                }
                totalDist  += this.manhattanDist(tile, n, i, j);
            }
        }
        return totalDist;
    }

    // is this board the goal board?
    public boolean isGoal() { 
        return (this.hamming() == 0);
    }

    // does this board equal y?
    public boolean equals(Object y) {
        if (this == y) {
            return true;
        }
        if (y == null || this.getClass() != y.getClass()) {
            return false;
        }

        Board other = (Board) y;
        int ny = other.dimension();

        if (ny != this.dimension()) {
            return false;
        }

        for (int i = 0; i < ny; i++) {
            for (int j = 0; j < ny; j++) {
                if (this.board[i][j] != other.board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    // uses classic conditionals for finding all neighbours
    public Iterable<Board> neighbors() {
        ArrayList<Board> neighbours = new ArrayList<Board>();
        int n = this.dimension();
        int i0 = 0;
        int j0 = 0;
        for (int i = 0; i < this.board.length; i++) { 
            for (int j = 0; j < this.board.length; j++) {
                if (this.board[i][j] == 0) {
                    i0 = i;
                    j0 = j;
                    break;
                }
            }
        }
        //conditionals for finding all neighbours
        if (i0 == 0) {
            //top row
            if (j0 == 0) {
                //left
                neighbours.add(neighbour(i0, j0, i0 + 1, j0));
                neighbours.add(neighbour(i0, j0, i0, j0 + 1));
                return neighbours;

            }
            else if (j0 == n - 1) {
                //right
                neighbours.add(neighbour(i0, j0, i0 + 1, j0));
                neighbours.add(neighbour(i0, j0, i0, j0 - 1));
                return neighbours;
            }
            else {
                //3 neigbours
                neighbours.add(neighbour(i0, j0, i0, j0 + 1));
                neighbours.add(neighbour(i0, j0, i0, j0 - 1));
                neighbours.add(neighbour(i0, j0, i0 + 1, j0));
                return neighbours;
            }
        }
        else if (i0 == n - 1) {
            //bottom row
            if (j0 == 0) {
                //left
                neighbours.add(neighbour(i0, j0, i0 - 1, j0));
                neighbours.add(neighbour(i0, j0, i0, j0 + 1));
                return neighbours;
                
            }
            else if (j0 == n - 1) {
                //right
                neighbours.add(neighbour(i0, j0, i0 - 1, j0));
                neighbours.add(neighbour(i0, j0, i0, j0 - 1));
                return neighbours;
                
            }
            else {
                //3 neighbours
                neighbours.add(neighbour(i0, j0, i0, j0 + 1));
                neighbours.add(neighbour(i0, j0, i0, j0 - 1));
                neighbours.add(neighbour(i0, j0, i0 - 1, j0));
                return neighbours;
            }
        }
        else {
            // middle
            if (j0 == 0) {
                //left middle
                neighbours.add(neighbour(i0, j0, i0 + 1, j0));
                neighbours.add(neighbour(i0, j0, i0 - 1, j0));
                neighbours.add(neighbour(i0, j0, i0, j0 + 1));
                return neighbours;
            }
            else if (j0 == n - 1) {
                //right middle
                neighbours.add(neighbour(i0, j0, i0 + 1, j0));
                neighbours.add(neighbour(i0, j0, i0 - 1, j0));
                neighbours.add(neighbour(i0, j0, i0, j0 - 1));
                return neighbours;
            }
            else {
                //4 neighbours
                neighbours.add(neighbour(i0, j0, i0 - 1, j0));
                neighbours.add(neighbour(i0, j0, i0 + 1, j0));
                neighbours.add(neighbour(i0, j0, i0, j0 - 1));
                neighbours.add(neighbour(i0, j0, i0, j0 + 1));
                return neighbours;
            }   
        }
    }

    // a board that is obtained by exchanging any pair of tiles
    public Board twin() {
        // swapping indices determined in constructor
        Board twin = new Board(this.board);
        twin.board[this.twini1][this.twinj1] = this.board[this.twini2][this.twinj2];
        twin.board[this.twini2][this.twinj2] = this.board[this.twini1][this.twinj1];
        return twin;
    }

    private int manhattanDist(int tile, int dimension, int i, int j) {
        int dist = 0;
        int correcti = (tile - 1) / dimension; // finding where tiles should be using some math things
        int correctj = (tile - 1) % dimension;
        dist += Math.abs(i - correcti);
        dist += Math.abs(j - correctj);
        return dist;
    }

    // makes a neighbours board, moving 0 tile according to arguments
    private Board neighbour(int i1, int j1, int i2, int j2) {
        Board neighbour = new Board(this.board);
        int temp = neighbour.board[i1][j1];
        neighbour.board[i1][j1] = neighbour.board[i2][j2];
        neighbour.board[i2][j2] = temp;
        return neighbour;

    }

    // unit testing (not graded)
    public static void main(String[] args) {
        int[][] tiles = {{0,1,2},{3,4,5},{6,7,8}};
        Board b = new Board(tiles);
        System.out.println(b);
        System.out.println(b.twin());

    }
}