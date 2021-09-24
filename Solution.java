
public class Solution {

    int totalCities;
    int totalProvinces;
    int[] parent;
    int[] rank;

    public int findCircleNum(int[][] isConnected) {

        totalCities = isConnected.length;
        totalProvinces = isConnected.length;
        rank = new int[isConnected.length];
        initializeParent();

        mapProvinces(isConnected);
        return totalProvinces;
    }

    public void mapProvinces(int[][] isConnected) {
        for (int r = 0; r < totalCities; r++) {
            for (int c = 0; c < totalCities; c++) {
                if (r != c && isConnected[r][c] == 1) {
                    union(r, c);
                }
            }
        }
    }

    public int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    public void initializeParent() {
        parent = new int[totalCities];
        for (int i = 0; i < totalCities; i++) {
            parent[i] = i;
        }
    }

    public void union(int indexOne, int indexTwo) {
        int indexOneParent = findParent(indexOne);
        int indexTwoParent = findParent(indexTwo);

        if (indexOneParent != indexTwoParent) {
            totalProvinces--;

            if (rank[indexOneParent] < rank[indexTwoParent]) {
                parent[indexOneParent] = indexTwoParent;
            } else if (parent[indexOneParent] > parent[indexTwoParent]) {
                parent[indexTwoParent] = indexOneParent;
            } else {
                parent[indexOneParent] = indexTwoParent;
                rank[indexOneParent]++;
            }
        }
    }
}
