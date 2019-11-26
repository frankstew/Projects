import java.util.Arrays;
import java.util.ArrayList;

public class BruteCollinearPoints {

    private LineSegment[] segments; 
    private int numberOfSegments;

    // finds all line segments containing 4 points
    public BruteCollinearPoints(Point[] points) {

        if (points == null) {
            throw new IllegalArgumentException();
        }
        // if equal pts throw exception
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

        // hope arraylists are allowed lol
        ArrayList<LineSegment> tempSegments = new ArrayList<LineSegment>();

        // if < 4 pts, no lines
        if (points.length < 4) {
            this.numberOfSegments = 0;
            this.segments = new LineSegment[0];
            return;
        }   

        for (int i = 0; i < points.length; i++) {
            for (int j = i + 1; j < points.length; j++) {
                for (int k = j + 1; k < points.length; k++) {
                    for (int w = k + 1; w < points.length; w++) {
                        
                        Point p1 = points[i];
                        Point p2 = points[j];
                        Point p3 = points[k];
                        Point p4 = points[w];
                        double slope1 = p1.slopeTo(p2);
                        double slope2 = p1.slopeTo(p3);
                        // check for collinearity
                        if (slope1 != slope2) {
                            continue;
                        }
                        double slope3 = p1.slopeTo(p4);
                        if (slope1 != slope3) {
                            continue;
                        }
                        if (slope2 != slope3) { // maybe uneccessary
                            continue;
                        }
                        Point[] potPoints = {p1, p2, p3, p4};

                        // adds line segment in order and increments numsegs
                        tempSegments.add(this.makeSegment(potPoints));                         

                    }
                }
            }
        }
        this.fillSegments(tempSegments);
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

    // makes segment so they are ordered from lowest pt to highest pt according to compareTo()
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
        this.numberOfSegments++;
        return finalLine;
    }

    // convert from arralist to array
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
   
}
