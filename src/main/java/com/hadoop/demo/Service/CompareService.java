package com.hadoop.demo.Service;

import com.hadoop.demo.Model.*;
import com.hadoop.demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;

@Service
public class CompareService {

    @Autowired
    private CpuDetailsService cpuDetailsService;
    @Autowired
    private GpuDetailsService gpuDetailsService;
    @Autowired
    private RamListRepository ramListRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;


    public CpuDetails getMatchingCpu(String ipAddress){
        List<String> matchingCpu = new ArrayList<>();

        UserInfo userCpu = userInfoRepository.findByIpAddress(ipAddress);
        System.out.println("userCPu : " + userCpu);
        List<CpuDetails> cpulist = cpuDetailsService.findAll();

        String findUserCpu = userCpu.getCpuInfo();
        CpuDetails cpu1 = null;
        System.out.println("finduserCPu : " + findUserCpu);
           for(CpuDetails cpu : cpulist){
                if(cpu.getOtherName().contains(",")){
                    String [] cpuNames = cpu.getOtherName().split(",");
                    for(int i=0; i<cpuNames.length; i++){
                        if(cpuNames[i].contains(findUserCpu) || findUserCpu.contains(cpuNames[i]))
                            matchingCpu.add(cpuNames[i]);
                    }
                    cpu1 = cpu;
                }
                else{
                    if((cpu.getOtherName().contains(findUserCpu) || findUserCpu.contains(cpu.getOtherName()))){
                        matchingCpu.add(cpu.getOtherName());
                    }
                    cpu1 = cpu;
                }

            }

            String[] cpuArray = matchingCpu.toArray(new String[matchingCpu.size()]);
            String mostSimilar = "";
            int maxSimilarity = 100;

            for (String findCpuArray : cpuArray) {
                int similarity = StringUtils.getLevenshteinDistance(findUserCpu, findCpuArray);
                if (similarity < maxSimilarity) {
                    maxSimilarity = similarity;
                    mostSimilar = findCpuArray;
                }
            }

            System.out.println("Most similar CPU: " + mostSimilar);
            System.out.println("2" + cpu1.getOtherName());
            return cpuDetailsService.findByName(cpu1.getCpuName());
    }

    public GpuDetails getMatchingGpu(String ipAddress){
        List<String> matchingGpu = new ArrayList<>();

        UserInfo userGpu = userInfoRepository.findByIpAddress(ipAddress);
        List<GpuDetails> gpulist = gpuDetailsService.findAll();

        String findUserGpu = userGpu.getGpuInfo();
        System.out.println("finduserGPu : " + findUserGpu);
        for(GpuDetails gpu : gpulist){
            if(gpu.getOtherName().contains(",")) {
                String[] gpuNames = gpu.getOtherName().split(",");
                for (int i = 0; i < gpuNames.length; i++) {
                    if (gpuNames[i].contains(findUserGpu) || findUserGpu.contains(gpuNames[i]))
                        matchingGpu.add(gpuNames[i]);
                }
            }
            else{
                if(gpu.getOtherName().contains(findUserGpu) || findUserGpu.contains(gpu.getOtherName())){
                    matchingGpu.add(gpu.getOtherName());
                }
            }
            System.out.println("matchingGpu :"+matchingGpu);
        }

        String[] gpuArray = matchingGpu.toArray(new String[matchingGpu.size()]);

        String mostSimilar = "";
        int maxSimilarity = 100;

        for (String findGpuArray : gpuArray) {
            int similarity = StringUtils.getLevenshteinDistance(findUserGpu, findGpuArray);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findGpuArray;
            }
        }
        System.out.println("Most similar Gpu: " + mostSimilar);

        return gpuDetailsService.findByOtherName(mostSimilar);
    }

    public RamList getMatchingRam(String ipAddress){
        List<String> matchingRam = new ArrayList<>();

        UserInfo userRam = userInfoRepository.findByIpAddress(ipAddress);
        List<RamList> ramList = ramListRepository.findAll();

        String lastData = userRam.getRamPartNum().replaceAll("\\(R\\)|\\(TM\\)|[™®]|(RAM)|", "");

        for(RamList ram : ramList){
            if(ram.getRamName().contains(lastData) || lastData.contains(ram.getRamName()))
                matchingRam.add(ram.getRamName());
        }

        String[] ramArray = matchingRam.toArray(new String[matchingRam.size()]);

        String mostSimilar = "";
        int maxSimilarity = 100;

        for (String findRamArray : ramArray) {
            int similarity = StringUtils.getLevenshteinDistance(lastData, findRamArray);
            if (similarity < maxSimilarity) {
                maxSimilarity = similarity;
                mostSimilar = findRamArray;
            }
        }

        System.out.println("Most similar RAM: " + mostSimilar);

        return ramListRepository.findByRamName(mostSimilar);
    }

}
