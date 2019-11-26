import java.util.ArrayList;
import java.util.Arrays;

// finds all line segments containing 4 or more points
public class FastCollinearPoints {

    private LineSegment[] segments; 
    private int numberOfSegments;
    
   public FastCollinearPoints(Point[] points) {
       

        if (points == null) {
            throw new IllegalArgumentException();
        }
        // if equal pts in points throw exception
        for (int i = 0; i < points.length; i++) {
            Point p0 = points[i];
            if (p0 == null) {
                throw new IllegalArgumentException();
            }
            for (int j = i+1; j < points.length; j++) {
                Point p = points[j];
                if (p == null) {
                    throw new IllegalArgumentException();
                }
                if (p0.compareTo(p) == 0) {
                    throw new IllegalArgumentException();
                }
            }
        }

        // arraylist to store segments
        ArrayList<LineSegment> linSegs = new ArrayList<LineSegment>();

        for (int i = 0; i < points.length; i++) {

            Point p = points[i];

            // copy array to find lines so order of points isnt messed up in points
            Point[] pointsCopy = Arrays.copyOf(points, points.length);
            
            // p origin
            // origin point, need to iterate this through all points.
            // nlogn for sorting, times n for all points = n^2logn
            Arrays.sort(pointsCopy, p.slopeOrder());  // sort other points by slope with p

            int j = 1; // start from 1 bc 0 already collinear by defn
            int cnt = 1; // one pt in line so far always (origin)

            // arraylist to store points for potential line as we go
            ArrayList<Point> potLine = new ArrayList<Point>();

            while (j < pointsCopy.length) {

                // re-initialize potLine if cnt was reset (end of equal slopes in pointsCopy)
                if (cnt == 1) {
                    potLine = new ArrayList<Point>(); 
                    potLine.add(pointsCopy[0]); 
                }

                // use to slopes to see if the line continues or starts
                double prevSlope = p.slopeTo(pointsCopy[j-1]);
                double slopej = p.slopeTo(pointsCopy[j]);

                if (prevSlope == slopej) {

                    // if equal and line has only origin, need to add j-1 and j, o/w just j
                    if (cnt == 1) {
                        potLine.add(pointsCopy[j-1]);
                        cnt++;
                    }

                    // add j
                    potLine.add(pointsCopy[j]);
                    cnt++;

                    // only continue if we aren't at the end of pointsCopy, o/w need to make it a line
                    if (j < pointsCopy.length - 1) {
                        j++;
                        continue;
                    }
                    j++;
                }
                
                // if 3 or more have same slope wrt p, if so make it a line 
                if (cnt >= 4) { 

                    // make potLine into array to pass into makeSegment (could just use arraylist)
                    Point[] linePts = new Point[potLine.size()];

                    for (int k = 0; k < linePts.length; k++) {
                        linePts[k] = potLine.get(k);
                    }

                    // make into a line segment with lowest point as start and highest as end
                    // according to compareTo() in Point
                    LineSegment seg = this.makeSegment(linePts);

                    // make sure point isnt already in linSegs
                    if (checkSegment(seg, linSegs)) {
                        cnt = 1;
                        j++;
                        continue;

                    } else {
                        linSegs.add(seg);
                        this.numberOfSegments++;
                    }
                }

                cnt = 1;
                j++;

            }
            
        }
        
        // after all segments are found turn linSegs into array segments for API
        this.fillSegments(linSegs);
        
    }     

   // the number of line segments
   public int numberOfSegments() { 
        int num = this.numberOfSegments;       
        return num;
    }
   
   // the line segments

   public LineSegment[] segments() {   
        LineSegment[] segs = Arrays.copyOf(this.segments, this.segments.length);      
        return segs;
    }

    private void fillSegments(ArrayList<LineSegment> lS) {
        int len = lS.size();
        this.segments = new LineSegment[len];
        if (len == 0) {
            return;
        }

        for (int i = 0; i < len; i++) {
            this.segments[i] = lS.get(i);
        }
    }
 
   // false if ls not in LS, true if it is by checking if toString() is equal, works because
   // start and end points are well defined
   private boolean checkSegment(LineSegment ls, ArrayList<LineSegment> lS) {
    // could have another array with points of segments that checked if the line was already done
       for (int i = 0; i < lS.size(); i++) {
           if (ls.toString().equals(lS.get(i).toString())) {
               return true;
           }
       }

       return false;
   }

   // makes a segment, using compareTo() to order the points so start == lowest, end == highest
   private LineSegment makeSegment(Point[] line) {

        Point start = line[0];
        Point end = line[0];

        for (int i = 1; i < line.length; i++) {
            int compstart = line[i].compareTo(start);
            int compend = line[i].compareTo(end);

            if (compstart < 0) {
                start = line[i];
                continue;
            }
            if (compend > 0) {
                end = line[i];
            }
        }

        LineSegment finalLine = new LineSegment(start, end);
        return finalLine;
        
    }

}