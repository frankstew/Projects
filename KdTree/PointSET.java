import edu.princeton.cs.algs4.SET;
import edu.princeton.cs.algs4.Point2D;
import edu.princeton.cs.algs4.RectHV;
import edu.princeton.cs.algs4.StdDraw;
import java.util.ArrayList;

public class PointSET {
    Point2D a = new Point2D(0.1, 0.1);
    Point2D b = new Point2D(0.05, 0.1);
    Point2D c = new Point2D(0.03, 0.1);
    Point2D d = new Point2D(0.07, 0.1);

    SET<Point2D> RBBST;

   public PointSET() {
        this.RBBST = new SET<Point2D>();
   }                             
   // construct an empty set of points

   public boolean isEmpty() {
        if (this.RBBST == null) {
            throw new IllegalArgumentException();
        }
        return this.RBBST.isEmpty();
   }                    
   // is the set empty? 

   public int size() {
        if (this.RBBST == null) {
            throw new IllegalArgumentException();
        }
        return this.RBBST.size();
   }                       
   // number of points in the set

   public void insert(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException();
        }
        this.RBBST.add(p);
   }             
   // add the point to the set (if it is not already in the set)

   public boolean contains(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException();
        }
        return this.RBBST.contains(p);
   }        
   // does the set contain point p? 

   public void draw() {
        if (this.RBBST == null) {
            throw new IllegalArgumentException();
        }
        for (Point2D p: this.RBBST) {
            p.draw();
        }
        return;
   }                       
   // draw all points to standard draw 

   public Iterable<Point2D> range(RectHV rect) {
       if (rect == null) {
           throw new IllegalArgumentException();
       }
        ArrayList<Point2D> psInRect = new ArrayList<Point2D>();
        for (Point2D p: this.RBBST) {
            if (rect.contains(p)) {
                psInRect.add(p);
            }
        }
        return psInRect;
   }       
   // all points that are inside the rectangle (or on the boundary) 

   public Point2D nearest(Point2D p) {
       if (p == null) {
           throw new IllegalArgumentException();
       }
        double minDist = 0;
        Point2D nearest = null;

        for (Point2D point: this.RBBST) {
            double dist = p.distanceTo(point);
            if (nearest == null) {
                minDist = dist;
                nearest = point; 
                continue;
            }
            if (dist < minDist) {
                minDist = dist;
                nearest = point;
            }   
        }
        return nearest;
   }           
   // a nearest neighbor in the set to point p; null if the set is empty 


   public static void main(String[] args) {
        PointSET p = new PointSET(); 
        //ArrayList<Point2D> points = new ArrayList<Point2D>();
        for (int i = 0; i < 20; i++) {
            Point2D p0 = new Point2D(i, i);
            p.insert(p0);
        }
        StdDraw.setXscale(0, 25);
        StdDraw.setYscale(0, 25);
        RectHV rect = new RectHV(0,5,6,5);
        System.out.println(p.range(rect));
        p.draw();
        StdDraw.show();
   }             
   // unit testing of the methods (optional) 
   
}