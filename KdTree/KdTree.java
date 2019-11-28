import edu.princeton.cs.algs4.Point2D;
import edu.princeton.cs.algs4.StdDraw;
import edu.princeton.cs.algs4.Queue;
import edu.princeton.cs.algs4.RectHV;
import java.awt.*;
import java.util.ArrayList;

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
      if (p == null) {
         throw new IllegalArgumentException();
      }
      this.root = insert(this.root, p, true, 0, 5, 0, 5);


   } 
   
   private Node insert(Node x, Point2D p, boolean vertical, double xMin, double xMax, double yMin, double yMax) {
      if (x == null) {
         // need rectangles to be one step back, i think just dont change in this conditional
         if (vertical) {
            this.size++;
            return new Node(p, vertical, xMin, xMax, yMin, yMax);
         } else {
            this.size++;
            return new Node(p, vertical, xMin, xMax, yMin, yMax);
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
   
   
   // does the set contain point p? 
   public boolean contains(Point2D p) {
      if (p == null) {
         throw new IllegalArgumentException();
      }
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
   public void draw() { // need to fix for new rectngles for range and nn

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
            StdDraw.line(n.point.x(),n.rect.ymin(),n.point.x(),n.rect.ymax());
         }
         if (!n.vert) {
            StdDraw.setPenColor(b);
            StdDraw.line(n.rect.xmin(),n.point.y(),n.rect.xmax(),n.point.y());
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

   
   
   public Iterable<Point2D> range(RectHV rect) {
      if (rect == null) {
         throw new IllegalArgumentException();
      }
      Queue<Node> q = new Queue<Node>();
      ArrayList<Point2D> pointsInRange = new ArrayList<Point2D>();
      q.enqueue(this.root);
      while (q.size() > 0) {
         Node n = q.dequeue();
         if (rect.contains(n.point)) {
            //System.out.println(n.point);
            //System.out.println(rect);
            pointsInRange.add(n.point);
         }
         if (n.LST != null && n.LST.rect.intersects(rect)) {
            q.enqueue(n.LST);
         }
         if (n.RST != null && n.RST.rect.intersects(rect)) {
            q.enqueue(n.RST);
         }
         
      }
      return pointsInRange;

   }
   // modify queue in draw should work for both           
   // all points that are inside the rectangle (or on the boundary) 
   public Point2D nearest(Point2D p) { //maye depth first would be faster
      if (p == null) {
         throw new IllegalArgumentException();
      }
      Queue<Node> q = new Queue<Node>();
      double minDist = p.distanceSquaredTo(this.root.point);
      Point2D nearest = this.root.point;
      q.enqueue(this.root);
      
      while (q.size() > 0) {
         Node n = q.dequeue();
         //System.out.println(n.point);
         double dist = p.distanceSquaredTo(n.point);
         if (dist <= minDist) {
            //System.out.print(n.point);
            //System.out.println(dist);
            minDist = dist;
            nearest = n.point;
         }
         if (n.LST != null && n.LST.rect.distanceSquaredTo(p) < minDist) {
            q.enqueue(n.LST);
         }
         if (n.RST != null && n.RST.rect.distanceSquaredTo(p) < minDist) {
            q.enqueue(n.RST);
         }
      }
      return nearest;
   }
   //check the child rect not parent rect for pruning
   // a nearest neighbor in the set to point p; null if the set is empty

   public static void main(String[] args) {
   }              
}