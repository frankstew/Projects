import edu.princeton.cs.algs4.Point2D;
import edu.princeton.cs.algs4.StdDraw;
import edu.princeton.cs.algs4.Queue;
import edu.princeton.cs.algs4.RectHV;
import java.awt.*;

public class KdTree {

   private static class Node {
      boolean vert;
      RectHV rect;
      Node LST;
      Node RST;
      Point2D point;

      public Node(Point2D p, boolean vertical, double xMin, double xMax, double yMin, double yMax) {
         this.point = p;
         this.vert = vertical;
         this.rect = new RectHV(xMin, yMin, xMax, yMax);
      }
      
   }

   private int size;
   private Node root;
   // dont use rbbst. make a bst, balancing messes the order up
   public KdTree() {
      //this.root = new Node();
      this.size = 0;

      //System.out.println(this.root.LST == null);

   }                            
   // construct an empty set of points 
   public boolean isEmpty() {
      return (this.size == 0);
   }                     
   // is the set empty? 
   public int size() {
      int s = this.size;
      return s;
   }                         
   // number of points in the set 

   // add the point to the set (if it is not already in the set)
   public void insert(Point2D p) {
      // trying way in slides
      this.root = insert(this.root, p, true, 0, 5, 0, 5);


   } 
   
   private Node insert(Node x, Point2D p, boolean vertical, double xMin, double xMax, double yMin, double yMax) {
      if (x == null) {
         // if vertical, change xMax, horiz change yMax pretty sure
         if (vertical) {
            return new Node(p, vertical, xMin, p.x(), yMin, yMax);
         } else {
         return new Node(p, vertical, xMin, xMax, yMin, p.y());
         }
      }
      if (x.point.compareTo(p) == 0) {
         return x;
      }
      if (x.vert) {
         // compare x
         if (p.x() < x.point.x()) {
            x.LST = insert(x.LST, p, !vertical, xMin, x.point.x(), yMin, yMax); // set minx, maxx, miny, maxy, here for rects
            
         } else {
            x.RST = insert(x.RST, p, !vertical, x.point.x(), xMax, yMin, yMax);
         }
      }
      if (!x.vert) {
         // compare y
         if (p.y() < x.point.y()) {
            x.LST = insert(x.LST, p, !vertical, xMin, xMax, yMin, x.point.y());
         } else {
            x.RST = insert(x.RST, p, !vertical, xMin, xMax, x.point.y(), yMax);
         }
      }
      return x;
   }
   
   public void printRoot(){
      System.out.println(this.root.RST.LST.LST.point);
      //System.out.println(this.root.vert);
   }
   // does the set contain point p? 
   public boolean contains(Point2D p) {
      Node x = this.root;

      while (x != null) {
         int cmp = x.point.compareTo(p);
         // if point is found
         if (cmp == 0) {
            // point is found
            return true;
         }
         if (x.vert) {
            // compare x coords
            if (p.x() < x.point.x()) {
               x = x.LST;
            } else {
               x = x.RST;
            }
            
         }
         else if (!x.vert) {
            // compare y coords
            if (p.y() < x.point.y()) {
               x = x.LST;
            } else {
               x = x.RST;
            }
         }
      }
      return false;
   }            

   // draw all points to standard draw 
   public void draw() { // looks like it worked first try holy fuk

      StdDraw.setPenRadius(0.01);
      Queue<Node> q = new Queue<Node>();
      q.enqueue(this.root);
      Color b = Color.BLUE;
      Color r = Color.RED;
      Color bl = Color.BLACK;

      while (q.size() > 0) {

         Node n = q.dequeue();
         StdDraw.setPenColor(bl);
         StdDraw.point(n.point.x(), n.point.y());
         StdDraw.setPenRadius(0.002);
         

         if (n.vert) {
            StdDraw.setPenColor(r);
            StdDraw.line(n.rect.xmax(),n.rect.ymin(),n.rect.xmax(),n.rect.ymax()); //put rects in nodes to help wiht draw
            // not as complicated as i thought, only 2^k possible lines, need to keep track of a lot of rects
         }
         if (!n.vert) {
            StdDraw.setPenColor(b);
            StdDraw.line(n.rect.xmin(),n.rect.ymax(),n.rect.xmax(),n.rect.ymax());
         }

         StdDraw.setPenRadius(0.01);
         
         if (n.LST != null ) {
            q.enqueue(n.LST);
         }
         if (n.RST != null) {
            q.enqueue(n.RST);
         }
      }
   }   

   
   
   //public Iterable<Point2D> range(RectHV rect)  
   // modify queue in draw should work for both           
   // all points that are inside the rectangle (or on the boundary) 
   //public Point2D nearest(Point2D p)             
   // a nearest neighbor in the set to point p; null if the set is empty 


   public static void main(String[] args) {
      Point2D p1 = new Point2D(3,2.1);
      Point2D p2 = new Point2D(0,2.5);
      Point2D p3 = new Point2D(1.5,3);
      Point2D p4 = new Point2D(1.69,1);
      Point2D p5 = new Point2D(2,2.2);
      Point2D p6 = new Point2D(3.9,2);
      Point2D p7 = new Point2D(1.4,1.4);
      KdTree k = new KdTree();
      k.insert(p1);
      k.insert(p2);
      k.insert(p3);
      k.insert(p4);
      k.insert(p5);
      k.insert(p6);
      k.insert(p7);

      //k.printRoot();
      //System.out.println(k.contains(p6));
      //System.out.println(p1.compareTo(p1));
      StdDraw.setXscale(0, 5);
      StdDraw.setYscale(0, 5);
      k.draw();


   }             
   // unit testing of the methods (optional) 
}