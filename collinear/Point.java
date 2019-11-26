// need to return comparator in point class so that it can be passed to Arrays.sort, easier to do in
// an inner class than a whole other object (and its the API) supposed to be 
// p1.slopeOrder().compareTo(p2,p3) I think that it what chat is saying
// need ia as part of each point so that it can calculate slopes relative to p1, so inner class is 
// necessary
import java.util.Comparator;
import edu.princeton.cs.algs4.StdDraw;

public class Point implements Comparable<Point> {

    private final int x;     // x-coordinate of this point
    private final int y;     // y-coordinate of this point

    public Point(int x, int y) {                        // constructs the point (x, y)
        this.x = x;
        this.y = y;
    }

    public   void draw() {                              // draws this point
        StdDraw.point(x, y);
    }

    public void drawTo(Point that) {                    // draws the line segment from this point to that point
        StdDraw.line(this.x, this.y, that.x, that.y);
    }

    public String toString() {                          // string representation
        return "(" + x + ", " + y + ")";
    }
    
    public int compareTo(Point that) {                   // compare two points by y-coordinates, breaking ties by x-coordinates
        if (this.y < that.y) {
            return -1;
        }
        if (this.y == that.y && this.x < that.x) {
            return -1;
        }
        if (this.y == that.y && this.x == that.x) {
            return 0;
        }
        return 1;
    }

    public double slopeTo(Point that) {  
        if (that == null) {
            throw new NullPointerException();
        }                // the slope between this point and that point
        double slope;
        if (this.y == that.y && this.x == that.x) {
            slope = Double.NEGATIVE_INFINITY;
            return slope;
        }
        if (this.y == that.y) {
            slope = 0;
            return 0;
        }
        if (this.x == that.x) {
            slope = Double.POSITIVE_INFINITY;
            return slope;
        }
        double thisx = this.x;
        double thisy = this.y;
        double thatx = that.x;
        double thaty = that.y;
        slope = (thaty - thisy) / (thatx - thisx);
        return slope;
    }

    public Comparator<Point> slopeOrder() {              // compare two points by slopes they make with this point
        return new SlopeOrder();
    }

    private class SlopeOrder implements Comparator<Point> {

        public int compare(Point p1, Point p2) {
            double slope1 = slopeTo(p1);
            double slope2 = slopeTo(p2);
            if (slope1 < slope2) {
                return -1;
            }
            if (slope1 > slope2) {
                return 1;
            }
            return 0;
        }
    }

}