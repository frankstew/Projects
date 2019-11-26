import edu.princeton.cs.algs4.MinPQ;
import java.util.Comparator;
import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.Stack;
public class Solver {

    
    private Node current;
    private Node currentTwin;
    private boolean solves = true;

    private class Node {
        Node prev;
        int numMoves;
        int manhattan;
        Board board;
    }

    // find a solution to the initial board (using the A* algorithm)
    // 2x2s dont always work, something to do with twin and the unsolvable thing
    public Solver(Board initial) {
        if (initial == null) {
            throw new IllegalArgumentException();
        }
        
        MinPQ<Node> searchNodes; // can put these in constructor but seems to make it a lot slower
        MinPQ<Node> twinNodes;
        PriorityComp priComp =  new PriorityComp();
        searchNodes = new MinPQ<Node>(priComp);
        twinNodes = new MinPQ<Node>(priComp);

        this.current = new Node();
        this.current.board = initial;
        this.current.prev = null;
        this.current.numMoves = 0;
        this.current.manhattan = current.board.manhattan();
        searchNodes.insert(this.current);
        int moveCnt = 0;

        this.currentTwin = new Node();
        
        this.currentTwin.board = initial.twin();
        

        this.currentTwin.prev = null;
        this.currentTwin.numMoves = 0;
        this.currentTwin.manhattan = currentTwin.board.manhattan();
        twinNodes.insert(this.currentTwin);
        int twinMoveCnt = 0;
        
        while (!this.current.board.isGoal() && !this.currentTwin.board.isGoal()) {

            this.current = searchNodes.delMin();
            Iterable<Board> neighbs = this.current.board.neighbors();
            moveCnt = this.current.numMoves + 1;
            Node[] neighbsArr = new Node[4];
            

            this.currentTwin = twinNodes.delMin();
            Iterable<Board> twinNeighbs = this.currentTwin.board.neighbors();
            twinMoveCnt = this.currentTwin.numMoves + 1;
            Node[] twinNeighbsArr = new Node[4];
            int i = 0;

            for (Board b: neighbs) {

                neighbsArr[i] = new Node();
                neighbsArr[i].board = b;
                neighbsArr[i].prev = this.current;
                neighbsArr[i].numMoves = moveCnt;
                if (this.current.prev != null && this.current.prev.board.equals(b)) {
                    continue;
                }
                neighbsArr[i].manhattan = b.manhattan();
                searchNodes.insert(neighbsArr[i++]);
            }
            

            i = 0;
            // alternating twin and current to see if solvable
            for (Board b: twinNeighbs) {

                twinNeighbsArr[i] = new Node();
                twinNeighbsArr[i].board = b;
                twinNeighbsArr[i].prev = this.currentTwin;
                twinNeighbsArr[i].numMoves = twinMoveCnt;
                if (this.currentTwin.prev != null && this.currentTwin.prev.board.equals(b)) {
                    continue;
                }
                twinNeighbsArr[i].manhattan = b.manhattan();
                twinNodes.insert(twinNeighbsArr[i++]);
            }
        }

        if (this.current.board.isGoal()) {
            this.solves = true;
        } if (this.currentTwin.board.isGoal()) {
            this.solves = false;
        } 

    }

    

    // is the initial board solvable?
    public boolean isSolvable() {
        boolean yes = this.solves;
        return yes;
    }

    // min number of moves to solve initial board
    public int moves() {
        if (!this.isSolvable()) {
            return -1;
        }
        int moves = this.current.numMoves;
        return moves;
    }

    // sequence of boards in a shortest solution
    public Iterable<Board> solution() {
        if (!this.isSolvable()) {
            return null;
        }
        Node first = this.current;
        Stack<Board> sequence = new Stack<Board>();
        sequence.push(first.board);
        while (!(first.prev == null)) {
            first = first.prev;
            sequence.push(first.board);
        }
        return sequence;
    }

//Comparator
    private Comparator<Node> priorityComp() {
        return new PriorityComp();
    }

    private class PriorityComp implements Comparator<Node> {
        
        public int compare(Node n1, Node n2) { 
            int multMan = 100; //play around with these for timing / accuracy
            // although 90 moves timing from 124/125 to 125/125 so idk
            int multMoves = 90;
            int priority1 = multMan * n1.manhattan + multMoves * n1.numMoves;
            int priority2 = multMan * n2.manhattan + multMoves * n2.numMoves;
            if (priority1 == priority2) {
                return ( n1.board.hamming() + n1.numMoves - n2.board.hamming() - n2.numMoves);
            }
            return (priority1 - priority2); // returns < 0 if priority1 < priority2

        }
    }

    // test client (see below) 
    public static void main(String[] args) {

        // create initial board from file
        In in = new In(args[0]);
        int n = in.readInt();
        int[][] tiles = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                tiles[i][j] = in.readInt();
        Board initial = new Board(tiles);
    
        // solve the puzzle
        Solver solver = new Solver(initial);
    
        // print solution to standard output
        if (!solver.isSolvable())
            StdOut.println("No solution possible");
        else {
            StdOut.println("Minimum number of moves = " + solver.moves());
            for (Board board : solver.solution())
                StdOut.println(board);
        }
    }

}