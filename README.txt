Personal Projects

KdTree:
Currently implements a 2D tree with functioning range search and nearest neighbour functions. 
Includes visualizers for the tree construction, range search, and nearest neighbour methods.
Includes a brute force implentation for comparison, brute force PointSET uses RBBST for the
same methods. 
Compile and run with algs4.jar added to the path, javac -cp ;algs4.jar <filename>.

TODO:
- Refactor and make pretty.
- Use depth first for nearest() not breadth first.
- Generalize to KdTree.


Collinear:
Currently uses sorting of point2D objects to find all sets of 4 collinear points.
Includes brute force implemtation for comparison, BruteCollinear.
Test data is there for examples of file format for input data.
Includes a client to use for data input.
Compile and run with algs4.jar added to the path, javac -cp ;algs4.jar <filename>.

TODO:
- Generalize to n co-linear points.
- Refactor.

Npuzzle:
Currently uses A* with manhattan and hamming priority functions to find and optimal solution to
a given n-puzzle.
Test data is useful for input formats.
Compile and run with algs4.jar added to the path, javac -cp ;algs4.jar <filename>.

TODO:
- Refactor.
- Play with priority functions for optimaal solution to ALL puzzles.
